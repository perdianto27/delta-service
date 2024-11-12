const Pino = require('pino')({
  level: 'info',
  base: null,
  formatters: {
    level: (label) => ({ level: label })
  },
});

const log = (tags, data) => {
  const logs = { tags };
  if (data) {
    Object.assign(logs, { data });
  }

  Pino.info(logs);
};

module.exports = {
  log
};