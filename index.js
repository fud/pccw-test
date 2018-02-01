/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => {
    return 'hello world';
};

exports.stripPrivateProperties = (properties, items) => {

    return items.map((item) => {
        return Object.keys(item).reduce((privateItems, key) => {

            if (properties.indexOf(key) < 0) {
                privateItems[key] = item[key];
            }

            return privateItems;
        }, {});

    });
};

exports.excludeByProperty = (property, items) => {
    return items.filter((item) => {
        return !item.hasOwnProperty(property);
    });
};

exports.sumDeep = (items) => {
    return items.map(({ objects }) => {
        const total = objects.reduce((sum, { val }) => sum + val, 0);

        return {
            objects: total
        };
    });
};

exports.applyStatusColor = (statusCodes, items) => {
    const statusCodesMapped = Object.keys(statusCodes).reduce((allCodes, key) => {

        statusCodes[key].forEach((code) => {
            allCodes[code] = key;
        });

        return allCodes;
    }, {});

    return items.reduce((appliedStatusColors, item) => {
        const { status } = item;
        const color = statusCodesMapped[status];

        if (color) {
            const appliedColor = {
                status: status,
                color: color
            };

            appliedStatusColors.push(appliedColor);
        }

        return appliedStatusColors;

    }, []);
};

exports.createGreeting = (greet, message) => {
    return (name) => {
        return greet(message, name);
    };
};

exports.setDefaults = (defaults) => {
    return (item) => {
        return Object.assign({}, defaults, item);
    };
};

exports.sanitizeUser = (newUser) => {
    const user = Object.assign({}, newUser);

    // if they only input one name assume it's the first name.
    user.firstName = user.name ? user.name.split(' ', 2)[0] : '';

    let monthJoined = parseInt(user.monthJoined, 10);

    if (isNaN(monthJoined)) {
        monthJoined = (new Date()).getMonth();
    }

    // 1 indexed.
    user.monthJoined += 1;

    const { num, street, suburb } = user.address;

    if (num && street && suburb) {
        user.fullAddress = `${num} ${street}, ${suburb}`;
    }

    return user;
};