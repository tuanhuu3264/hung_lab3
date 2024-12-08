module.exports = {
  render: function (template, data) {
    template = this.handleTemplate(template, data);
    template = this.handleFor(template, data);
    template = this.handleIf(template, data);
    template = this.replaceVariables(template, data);

    return template;
  },

  replaceVariables: function (template, data) {
    try {
      return template.replace(/20488{(.*?)}/g, (match, variable) => {
        if (data[variable] !== undefined) {
          return data[variable];
        }

        if (variable.startsWith("if ")) {
          const condition = variable.slice(3).trim();
          return this.evaluateCondition(condition, data) ? "true" : "false";
        }

        return this.evaluateExpression(variable, data);
      });
    } catch (e) {
      console.error("Error during variable replacement:", e);
      return template;
    }
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
      /20488{for (.*?) in (.*?)}(.*?){\/for}/gs,
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
              const prop = key.replace(/[{}]/g, "").trim().split(".")[1];
              return item[prop] || key;
            });
          })
          .join("");
      }
    );
  },
  handleTemplate: function (template, data) {
    return template.replace(/20488{\+ (.*?)\}/gs, (match, sectionName) => {
      const sectionContent = this.getSectionContent(sectionName, data);
      if (sectionContent !== undefined) {
        let processedContent = this.handleFor(sectionContent, data);
        processedContent = this.handleIf(processedContent, data);
        processedContent = this.replaceVariables(processedContent, data);

        return processedContent;
      }
      return match;
    });
  },

  getSectionContent: function (sectionName, data) {
    if (data[sectionName]) {
      return data[sectionName];
    }
    console.error(`Section '${sectionName}' not found in data.`);
    return undefined;
  },
  evalCondition: function (condition, variables) {
    return eval(
      condition.replace(
        /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g,
        (_, name) => variables[name] || "false"
      )
    );
  },
  evaluateExpression: function (expression, variables) {
    return eval(
      expression.replace(
        /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/g,
        (_, name) => variables[name] || 0
      )
    );
  },
};
