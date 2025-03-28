const pool = require('../connections/db')


function _appendWhere(headers){
    
    whereArray= [] 

    const { id} = headers;

    const whereValues = [
        { key: 'id', value: id, format: (v) => v }, 
    ];

    whereValues.forEach(({ key, value, format }) => {

        if (value != null && value !== '') { 

                whereArray.push(`${key} = ${format(value)}`);

        }
    });
    

    if(whereArray.length == 0){

        return null
    }else{

        where = "where "+whereArray.join(" AND ")


        return where
    }
    
}


async function getSpells(req, res) {

    try{

        where = _appendWhere(req.headers)

        if(where != null){

            StringQuery = `select * from DeD_spells ${where}`

        }else{     
  
            StringQuery = "select * from DeD_spells"
        }


        const transactions = await pool.query(StringQuery)
        res.send(transactions.rows);

    }catch(erro){
        console.error("Um erro ocorreu:")
        console.error(erro.mensagem)
        res.status(500).send('Erro a o Exibir Transação');
    }
    
}

module.exports = getSpells