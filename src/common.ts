import { plural } from "pluralize";

export default {
  get: (type, name): any => {
    return import(`./common/${plural(type)}/${name}`);
  },

  getClass: (name): any => {
    return require(`./common/classes/${name}`);
  },

  getController: (name): any => {
    return require(`./common/controllers/${name}`).default;
  },

  getConstant: (name): any => {
    return require(`./common/constants/${name}`);
  },

  getFilter: (name): any => {
    return require(`./common/filters/${name}`);
  },

  getHandler: (name): any => {
    return require(`./common/hanflers/${name}`);
  },

  getInterface: (name): any => {
    return require(`./common/interfaces/${name}`);
  },

  getService: (name): any => {
    return require(`./common/services/${name}`);
  },

  getUtil: (name): any => {
    return require(`./common/utils/${name}`);
  }
};
