// @flow

export function bem (blockName: string, ...modifiers: any[]) {
  return [blockName].concat(modifiers.filter(Boolean).map(modifier => `${blockName}--${modifier}`)).join(' ')
}
