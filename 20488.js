module.exports = {
  render: function (template, data) {
    template = this.replaceVariables(template, data);

    template = this.handleIf(template, data);

    template = this.handleFor(template, data);

    template = this.handleCalculation(template, data);

    return template;
  },

  replaceVariables: function (template, data) {
    return template.replace(/20488{(.*?)}/g, (match, variable) => {
      return data[variable.trim()] || match;
    });
  },

  handleIf: function (template, data) {
    return template.replace(
      /20488{if (.*?)\s*}(.*?){else}(.*?){\/if}/gs,
      (match, condition, truePart, falsePart) => {
        try {
          const conditionResult = this.evaluateCondition(condition, data);

          if (conditionResult) {
            return truePart.trim();
          } else {
            return falsePart.trim();
          }
        } catch (e) {
          console.error("Error evaluating condition:", e);
          return match;
        }
      }
    );
  },

  evaluateCondition: function (condition, data) {
    const trimmedCondition = condition.trim();

    if (data[trimmedCondition]) {
      return true;
    } else {
      return false;
    }
  },

  handleFor: function (template, data) {
    return template.replace(
      /20488{for (.*?) in (.*?)}(.*?){\/for}/g,
      (match, variable, arrayName, content) => {
        const array = data[arrayName.trim()];
        if (!Array.isArray(array)) {
          console.error(
            `Expected an array for '${arrayName}', but got: ${typeof array}`
          );
          return match;
        }

        return array
          .map((item) => {
            return content.replace(/{(.*?)}/g, (key) => {
              const prop = key.replace(/[{}]/g, "").trim();
              return item[prop] || key;
            });
          })
          .join("");
      }
    );
  },

  handleCalculation: function (template, data) {
    return template.replace(/20488{(.*?)}/g, (match, expression) => {
      try {
        return eval(expression);
      } catch (e) {
        return match;
      }
    });
  },
};
