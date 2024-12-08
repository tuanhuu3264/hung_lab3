function renderTemplate(template, data) {
  template = template.replace(/{(\w+)}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });

  template = template.replace(
    /{if (\w+)}([\s\S]*?){else}([\s\S]*?){\/if}/g,
    (match, condition, trueContent, falseContent) => {
      return data[condition] ? trueContent : falseContent;
    }
  );

  template = template.replace(
    /{for (\w+) in (\w+)}([\s\S]*?){\/for}/g,
    (match, item, array, loopContent) => {
      if (Array.isArray(data[array])) {
        return data[array]
          .map((element) =>
            renderTemplate(loopContent, { ...data, [item]: element })
          )
          .join("");
      }
      return "";
    }
  );
  return template;
}
