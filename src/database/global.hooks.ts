export const HOOKS = [];

export const applyHooks = async (db: any) => {
  HOOKS.forEach((hook: any) => {
    db[hook.type](hook.type, hook.func);
  });
};
