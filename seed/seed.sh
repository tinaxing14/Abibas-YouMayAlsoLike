#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
until mysql -u `cat ${DIR}/mysql.user`root`cat ${DIR}/mysql.pass` -e 'show databases'; do
echo "seed.sh: waiting for mysql"; sleep 5; done

echo "Seeding mysql ... ";
mysql -u `cat ${DIR}/mysql.user` -p`cat ${DIR}/mysql.pass` < ${DIR}/schema_data.sql;
