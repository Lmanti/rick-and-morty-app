const { Comment } = require('../db');

async function getCommentsForCharacter(characterId) {
    const comments = await Comment.findAll({
        where: { characterId },
        order: [['createdAt', 'DESC']]
    });

    return comments;
}

async function addComment(input) {
    const comment = await Comment.create(input);
    return comment.get({ plain: true });
}

module.exports = {
    getCommentsForCharacter,
    addComment
};