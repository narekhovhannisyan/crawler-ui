const models = require('../db')
const Promise = require('bluebird')

const findTrandingPosts = (minutes, growthRate, count) => {
  const time = Date.now() - 1000 * 60 * minutes 
	const afterMinutes = new Date(time).toUTCString()
  return models.Posts.findAll({
    where: {
      createdAt: {$lt: afterMinutes},
      last_growth_rate: {$lt: growthRate},
      crawl_count: {$gt: count} 
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