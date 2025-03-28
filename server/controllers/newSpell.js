const pool = require('../connections/db')

async function newSpell(req, res) {

    try{

        const { nome, level, casting_time,range,components,duration,description,higher_level_cast,origin_book,school} = req.body

        const newSpell = await pool.query(
            `INSERT INTO DeD_spells (nome, level, casting_time, range, components, duration, description, higher_level_cast, origin_book, school) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
             RETURNING *`,
            [nome, level, casting_time, range, components, duration, description, higher_level_cast, origin_book, school]
        )

        res.json(newSpell.rows[0])

    }catch (erro){
        console.error("Um erro ocorreu:")
        console.error(erro)
        res.status(500).send('Erro a o Registra spell');
    }


}

module.exports = newSpell