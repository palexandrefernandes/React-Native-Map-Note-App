import Realm from 'realm';

const NoteSchema = {
    name: 'Note',
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: 'string',
        description: 'string',
        urgency: {type: 'int', default: 0},
        date: 'date'
    }
};

const options = {
    schema: [NoteSchema]
}

export function writeNote(note){
    return Realm.open(options)
        .then(realm => {
            realm.write(() => {
                note.date = note.date ?? new Date();
                realm.create('Note', note);
            });
        });
}

export function readNotes(){
    return Realm.open(options)
        .then(realm => {
            const notes = realm.objects('Note');
            return notes;
        })
        .catch(err => {
            return [];
        });
}

// Might not work
export function updateNote(){
    return Realm.open(options)
        .then(realm => {
            note.date = new Date();
            realm.write(() => {
                realm.create('Note', note, true);
            });
        });
}
