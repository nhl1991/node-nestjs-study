const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../drizzle/connection");
const { eq } = require("drizzle-orm");
const { users } = require("../drizzle/schema");
const { nanoid } = require("nanoid");

exports.join = async (req, res, next) => {
  const { id, nick, password } = req.body;
  try {
    const exUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    if (exuser.length) {
      return res.redirect("/join?error=exist");
    }

    const hash = await bcrypt.hash(password, 12);
    const uuid = nanoid(12);
    await db.insert(users).values({
      id,
      uuid,
      nick,
      password: hash,
    });

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout(() => {
        res.redirect("/");
    })
}