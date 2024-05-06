/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (privateProps, array) => {
  return array.map((object) => {
    const newObject = {};
    Object.keys(object).forEach((prop) => {
      if (!privateProps.includes(prop)) {
        newObject[prop] = object[prop];
      }
    });
    return newObject;
  });
};

exports.excludeByProperty = (prop, array) => {
  return array.filter((object) => !Object.keys(object).includes(prop));
};

exports.sumDeep = (array) => {
  return array.map(({ objects }) => {
    const sum = objects.reduce((acc, current) => acc + current.val, 0);
    return { objects: sum };
  });
};

exports.applyStatusColor = (statusColors, array) => {
  const statusMap = {};

  function getStatusColor(status) {
    if (statusMap[status]) {
      return statusMap[status];
    }

    Object.keys(statusColors).some((color) => {
      if (statusColors[color].includes(status)) {
        statusMap[status] = color;
        return true;
      }
      return false;
    });

    return statusMap[status];
  }

  return array.reduce((result, { status }) => {
    const statusColor = getStatusColor(status);
    if (statusColor) {
      result.push({
        status,
        color: statusColor,
      });
    }
    return result;
  }, []);
};

exports.createGreeting = (greetFunc, greeting) => {
  return (name) => greetFunc(greeting, name);
};

exports.setDefaults = (defaultProps) => {
  return (object) => ({
    ...defaultProps,
    ...object,
  });
};

exports.fetchUserByNameAndUsersCompany = async (name, services) => {
  const users = await services.fetchUsers();
  const user = users.find((u) => u.name === name);

  const company = await services.fetchCompanyById(user.companyId);
  const status = await services.fetchStatus();

  return {
    user,
    status,
    company,
  };
};
