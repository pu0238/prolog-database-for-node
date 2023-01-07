import pl from 'tau-prolog';
import plPromises from 'tau-prolog/modules/promises.js';
import * as fs from 'fs';
import { ConflictException } from '@nestjs/common';

plPromises(pl);

export class prologDB {
  constructor(private readonly databaseName: string) {}

  private readonly pathToDatabase = `./db/${this.databaseName}.pl`;

  async findOne(query) {
    const session = pl.create(1000);
    await session.promiseConsult(this.pathToDatabase, { file: true });
    await session.promiseQuery(query);
    for await (const answer of session.promiseAnswers()) {
      const formatedAnswer = this.formatJSON(session, answer);
      if (!formatedAnswer) return undefined;
      return formatedAnswer;
    }
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
    session.answers((answer) => {
      console.log(answer);
    });
    for await (const answer of session.promiseAnswers())
      if (answer) throw new ConflictException('Data already exist');
    console.log(data);
    fs.appendFileSync(this.pathToDatabase, data);
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
