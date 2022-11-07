import { IItem } from '@interfaces';

const getLuaItem = (item: IItem) => {
  const lines = [`['${item.name}'] = {`, `    label = '${item.label}',`];

  if (item.description) lines.push(`    description = '${item.description}',`);
  if (item.weight) lines.push(`    weight = ${item.weight},`);

  lines.push('},');

  return lines.join('\n');
};

export default getLuaItem;
