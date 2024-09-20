
CREATE TABLE post_likes (
    post_id varchar(40),
	user_id varchar(40),
    is_liked boolean NOT NULL,
    CONSTRAINT post_likes_pk PRIMARY KEY(user_id,post_id),
    CONSTRAINT post_likes_user_id_fk FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT post_likes_note_id_fk FOREIGN KEY(post_id) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE comment_likes (
    comment_id varchar(40),
	user_id varchar(40),
    is_liked boolean NOT NULL,
    CONSTRAINT comment_likes_pk PRIMARY KEY(user_id,comment_id),
    CONSTRAINT comment_likes_user_id_fk FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT comment_likes_note_id_fk FOREIGN KEY(comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE ON UPDATE CASCADE
);