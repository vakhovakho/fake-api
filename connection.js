const sqlite3 = require('sqlite3').verbose();

module.exports = {
    db: null,

    connect(dbName){
        // open database in memory
        this.db = new sqlite3.Database(dbName, (err) => {
            if (err) {
            return console.error(err.message);
            }
            console.log('Connected to the in-memory SQlite database.');
        })
    },

    close() {
        // close the database connection
        this.close((err) => {
            if (err) {
            return console.error(err.message);
            }
            console.log('Close the database connection.');
        });
    },

    createNotesTable() {
        this.db.exec(`CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            text TEXT
        )`);
    },

    getNotes() {
        return new Promise((resolve, reject) => {
            this.db.all(` SELECT * FROM notes`, [], (err, row) => {
                resolve(row);
            });
        });
    },

    insertNote(title, text) {
        return new Promise((resolve) => {
            this.db.exec(`
                INSERT INTO notes
                (title, text)
                values('${title}','${text}')
            `);

            this.db.get(` SELECT * FROM notes ORDER BY id DESC LIMIT 1`, [], (err, row) => {
                resolve(row.id);
            });
        })
        
    },

    updateNote(id, title, text) {
        this.db.exec(`
            UPDATE notes
            SET title='${title}', text='${text}'
            WHERE id=${id}
        `);
    },

    deleteNote(id) {
        this.db.exec(`
            DELETE FROM notes
            WHERE id = ${id}
       `);
    }
};
