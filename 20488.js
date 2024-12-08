module.exports = {
  render: function (template, data) {
    template = this.replaceVariables(template, data);

    template = this.handleIf(template, data);

    template = this.handleFor(template, data);

    template = this.handleCalculation(template, data);

    return template;
  },
  replaceVariables: function (template, data) {
    return template.replace(/<20488>{(.*?)}/g, (match, variable) => {
      return data[variable.trim()] || match;
    });
  },

  handleIf: function (template, data) {
    return template
      .replace(/<20488>{if (.*?)\s*}/g, (match, condition) => {
        const conditionResult = eval(condition);
        return conditionResult
          ? match.split("{else)")[0]
          : match.split("{else)")[1];
      })
      .replace(/{\/if}/g, "");
  },

  handleFor: function (template, data) {
    return template.replace(
      /<20488>\(for (.*?) in (.*?)\)/g,
      (match, variable, arrayName) => {
        const array = data[arrayName.trim()];
        return array
          .map((item) => {
            return match.replace(/{\/for}/g, "").replace(/{.*?}/g, (key) => {
              return item[key.replace(/[{}]/g, "").trim()] || key;
            });
          })
          .join("");
      }
    );
  },

  handleCalculation: function (template, data) {
    return template.replace(/<20488>{(.*?)}/g, (match, expression) => {
      try {
        return eval(expression);
      } catch (e) {
        return match;
      }
    });
  },
};
