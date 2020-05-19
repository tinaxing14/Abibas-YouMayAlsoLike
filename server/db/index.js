const mysql = require('mysql');
const mysql_config = require('./mysql_config.js');
const Promise = require('bluebird');

const connection = mysql.createConnection(mysql_config);
const db = Promise.promisifyAll(connection, { multiArgs: true });

var getProduct = function(productId, callback){
  db.connect();
	Promise.all([
		db.queryAsync(`select * from products where id = '${productId}' limit 1`),
		db.queryAsync(`select toProductId from completeTheLook where fromProductId = '${productId}'`),
		db.queryAsync(`select toProductId from relatedProducts where fromProductId = '${productId}' and relationType = 'ymal'`)
	]).spread(([detail], [ctl], [ymal]) => {
		//only use the first argument of [results, fields] from the query above

		if(ctl)
			detail[0].ctl = ctl.map(c => c.toProductId);

		if(ymal)
			detail[0].ymal = ymal.map(y => y.toProductId);

		callback(detail[0]);
	}).catch( e => {
		console.log(e);
	});
};

module.exports.getProduct = getProduct;