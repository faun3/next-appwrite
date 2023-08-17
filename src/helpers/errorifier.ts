const errorifier = (value: any) => {
  if (value instanceof Error) {
    return value;
  } else {
    return new Error(
      `someone threw a non-error, here is its stringified form: ${JSON.stringify(
        value
      )}`
    );
  }
};

export default errorifier;
