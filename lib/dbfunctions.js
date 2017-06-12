const models = require('../db')
const Promise = require('bluebird')

const findTrandingPosts = () => {
  return models.Posts.findAll({
    //attributes: ['post_id', 'post_message'],
    where: {
      createdAt: {$lt: 6},
      last_growth_rate: {$lt: 200},
      crawl_count: {$gt: 3} 
    },
    order: ['last_growth_rate'],
    limit: 100
  })
}

const getFbPageIds = () => {
	const time = Date.now() - 1000 * 60 * 20 
	const after20Minutes = new Date(time).toUTCString()
	return models.Pages.findAll({
		attributes: ['page_id'],
		where: {
			$or: [{updatedAt: {$lt: after20Minutes}}, {updatedAt: null}]
		}
	})
}

module.exports = {
  findTrandingPosts,
  getFbPageIds
}