const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const hashPassword = (password) => new Promise((resolve, reject) => {
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) {
			reject(err)
		}

		// hash the password using our new salt
		bcrypt.hash(password, salt, function (err, hash) {
			if (err) {
				reject(err)
			}
			resolve(hash)
		});
	});
})

module.exports = {
	hashPassword
}
