const { relations } = require("drizzle-orm/relations");
const { users, posts, hashtags, postsToHashtags, follows } = require("./schema");


// 유저 - 포스트 릴레이션
exports.postsRelations = relations(posts, ({one, many}) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id]
  }),
  postsToHashtags: many(postsToHashtags),
}));

// 해시태그 - 게시글 매핑 릴레이션
exports.hashtagRelations = relations(hashtags, ({many}) => ({
  postsToHashtags: many(postsToHashtags),
}));

// 게시글-해시태그 매핑 릴레이션
exports.postsToHashtagsRelations = relations(postsToHashtags, ({ one }) => ({
  post: one(posts, {
    fields: [postsToHashtags.postId],
    references: [posts.id],
  }),
  hashtag: one(hashtags, {
    fields: [postsToHashtags.hashtagId],
    references: [hashtags.id],
  }),
}));

// 유저 - 팔로우 릴레이션

exports.usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  // 내가 팔로우한 사람들
  followings: many(follows, {
    relationName: 'followers',
  }),
  // 나를 팔로우한 사람들
  followers: many(follows, {
    relationName: 'followings',
  }),
}));

exports.followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, {
    fields: [follows.followerId],
    references: [users.id],
    relationName: 'followers',
  }),
  following: one(users, {
    fields: [follows.followingId],
    references: [users.id],
    relationName: 'followings',
  }),
}));