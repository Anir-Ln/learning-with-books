BEGIN TRANSACTION;;
INSERT INTO learning_levels(name) VALUES('Novice');
INSERT INTO learning_levels(name) VALUES('Elementary');
INSERT INTO learning_levels(name) VALUES('Intermediate');
INSERT INTO learning_levels(name) VALUES('Upper-Intermediate');
INSERT INTO learning_levels(name) VALUES('Advanced');

INSERT INTO phrase_types(name) VALUES('Sentence');
INSERT INTO phrase_types(name) VALUES('Verb');
INSERT INTO phrase_types(name) VALUES('Noun');
INSERT INTO phrase_types(name) VALUES('Adjective');
INSERT INTO phrase_types(name) VALUES('Adverb');
INSERT INTO phrase_types(name) VALUES('Participles');
INSERT INTO phrase_types(name) VALUES('Pronoun');
INSERT INTO phrase_types(name) VALUES('Preposition');
INSERT INTO phrase_types(name) VALUES('Conjunction');
INSERT INTO phrase_types(name) VALUES('Article');

INSERT INTO phrases (text, meaning, phrase_type_id, learning_level_id) VALUES ('Hello', 'Greeting', 8, 1);
INSERT INTO phrases (text, meaning, phrase_type_id, learning_level_id) VALUES ('Goodbye', 'Farewell', 8, 2);
INSERT INTO phrases (text, meaning, phrase_type_id, learning_level_id) VALUES ('Thank you', 'Expressing gratitude', 8, 3);
INSERT INTO phrases (text, meaning, phrase_type_id, learning_level_id) VALUES ('Yes', 'Affirmation', 8, 4);
INSERT INTO phrases (text, meaning, phrase_type_id, learning_level_id) VALUES ('No', 'Negation', 8, 5);
COMMIT;