import pl from 'tau-prolog';
import plPromises from 'tau-prolog/modules/promises.js';
import * as fs from 'fs';
plPromises(pl);

export const loadDatabase = (name: string) =>
  fs.readFileSync(`./db/${name}.pl`).toString();

export const getMany = async (
  program: string,
  query: string,
  format = 'json',
) => {
  const session = pl.create(1000);
  await session.promiseConsult(program);
  await session.promiseQuery(query);
  if (format === 'json') {
    const result = [];
    for await (const answer of session.promiseAnswers()) {
      result.push(formatJSON(session, answer));
    }
    return result;
  } else if (format === 'text' || format === 'txt') {
    const result = [];
    for await (const answer of session.promiseAnswers()) {
      result.push(session.format_answer(answer));
    }
    return result.join('\n');
  }
};

export const formatJSON = (session: any, answer: any) => {
  if (pl.type.is_error(answer)) {
    console.error(session.format_answer(answer));
    return undefined;
  } else if (answer === false) {
    return 'false';
  } else if (answer === null) {
    return 'limit exceeded';
  } else if (pl.type.is_substitution(answer)) {
    const answerResult = {};
    for (const key of Object.keys(answer.links))
      answerResult[key] = answer.links[key].toJavaScript();
    return answerResult;
  }
};
