import pl from 'tau-prolog';
import plPromises from 'tau-prolog/modules/promises.js';
import * as fs from 'fs';
import { ConflictException, NotFoundException } from '@nestjs/common';

plPromises(pl);

export class prologDB {
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
    await fs.appendFileSync(this.pathToDatabase, `${data}\n`);
    await session.promiseConsult(this.pathToDatabase, { file: true });
  }

  async update(dataToReplace, newData) {
    const session = pl.create(1000);
    const database = await fs.readFileSync(this.pathToDatabase).toString();
    const result = database.replace(`${dataToReplace}\n`, `${newData}\n`);
    await fs.writeFileSync(this.pathToDatabase, result);
    await session.promiseConsult(this.pathToDatabase, { file: true });
  }

  async remove(data) {
    const session = pl.create(1000);
    const database = await fs.readFileSync(this.pathToDatabase).toString();
    const result = database.replace(`${data}\n`, '');
    await fs.writeFileSync(this.pathToDatabase, result);
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
        answerResult[firstKeyToLowerCase] = answer.links[key].toJavaScript();
      }
      return answerResult;
    }
  };
}
