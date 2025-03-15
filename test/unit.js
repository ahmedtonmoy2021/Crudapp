import * as User from '../Controller/userController.js';

// Now you can use User.login(), User.admin() inside the test

import Bcrypt from 'bcryptjs';
import assert from 'assert';
/*
* We use BCrypt compare to check that this hash matches the generated one
*/
describe("Test the password hash function", function(){
it('should hash password correctly', function(){
let hash = User.hashPassword("password")
let result = Bcrypt.compareSync("password", hash)
assert.equal(result, true);
})
})