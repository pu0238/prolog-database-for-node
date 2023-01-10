import pl from 'tau-prolog';
import plPromises from 'tau-prolog/modules/promises.js';
import * as fs from 'fs';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

plPromises(pl);

export class PrologDatabase {
  constructor(private readonly databaseName: string) {}

  private readonly pathToDatabase = `./db/${this.databaseName}.pl`;

  async findOne(query): Promise<{ [key: string]: string }> {
    const session = pl.create(1000);
    await session.promiseConsult(this.pathToDatabase, { file: true });
    await session.promiseQuery(query);
    for await (const answer of session.promiseAnswers()) {
      const formatedAnswer = this.formatJSON(session, answer);
      if (!formatedAnswer) return undefined;
      return formatedAnswer;
    }
    throw new NotFoundException('Cannot find item with the given ID');
  }

  async find(query) {
    const session = pl.create(1000);
    await session.promiseConsult(this.pathToDatabase, { file: true });
    await session.promiseQuery(query);
    const result = [];
    for await (const answer of session.promiseAnswers()) {
      const formatedAnswer = this.formatJSON(session, answer);
      if (!formatedAnswer) return undefined;
      result.push(formatedAnswer);
    }
    return result;
  }

  async insert(data) {
    const session = pl.create(1000);
    await session.promiseConsult(this.pathToDatabase, { file: true });
    await session.promiseQuery(data);
    for await (const answer of session.promiseAnswers()) {
      if (answer) throw new ConflictException('Data already exist');
    }
    await fs.appendFileSync(this.pathToDatabase, `\n${data}`);
    await session.promiseConsult(this.pathToDatabase, { file: true });
  }

  async update(dataToReplace, newData) {
    const session = pl.create(1000);
    const database = await fs.readFileSync(this.pathToDatabase, {
      encoding: 'utf-8',
    });
    const splitedDatabase = database.split('\n');
    let indexOfData = splitedDatabase.indexOf(dataToReplace);
    if (indexOfData === -1) {
      indexOfData = splitedDatabase.indexOf(`${dataToReplace}\r`);
      if (indexOfData === -1) {
        throw new InternalServerErrorException();
      } else {
        splitedDatabase[indexOfData] = `${newData}\r`;
      }
    } else {
      splitedDatabase[indexOfData] = newData;
    }
    await fs.writeFileSync(this.pathToDatabase, splitedDatabase.join('\n'));
    await session.promiseConsult(this.pathToDatabase, { file: true });
  }

  async remove(data) {
    const session = pl.create(1000);
    const database = await fs.readFileSync(this.pathToDatabase, {
      encoding: 'utf-8',
    });
    const splitedDatabase = database.split('\n');
    let indexOfData = splitedDatabase.indexOf(data);
    if (indexOfData === -1) {
      indexOfData = splitedDatabase.indexOf(`${data}\r`);
      if (indexOfData === -1) {
        throw new InternalServerErrorException();
      }
    }
    splitedDatabase.splice(indexOfData, 1);
    await fs.writeFileSync(this.pathToDatabase, splitedDatabase.join('\n'));
    await session.promiseConsult(this.pathToDatabase, { file: true });
  }

  private formatJSON = (session: any, answer: any) => {
    if (pl.type.is_error(answer)) {
      console.error(session.format_answer(answer));
      return undefined;
    } else if (answer === false) return 'false';
    else if (answer === null) return 'limit exceeded';
    else if (pl.type.is_substitution(answer)) {
      const answerResult = {};
      for (const key of Object.keys(answer.links)) {
        const firstKeyToLowerCase =
          key.charAt(0).toLocaleLowerCase() + key.slice(1);
        if (key !== '_')
          answerResult[firstKeyToLowerCase] = answer.links[key].toJavaScript();
      }
      return answerResult;
    }
  };
}
