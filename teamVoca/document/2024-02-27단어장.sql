-- 단어장
DROP DATABASE vocaDB;
CREATE DATABASE vocaDB;
USE vocaDB;

CREATE TABLE tbl_words (
w_seq	INT AUTO_INCREMENT PRIMARY KEY,
w_vseq	INT	NOT NULL	,
w_word	VARCHAR(50)	NOT NULL	,
w_mean	VARCHAR(125)	NOT NULL,	
w_pron	VARCHAR(50)		,
w_memo	VARCHAR(125)	,	
w_mark	VARCHAR(5)		
);

CREATE TABLE tbl_vocas (
v_seq	INT	 AUTO_INCREMENT	PRIMARY KEY,
v_mid	VARCHAR(20)	NOT NULL	,
v_name	VARCHAR(20)	NOT NULL	,
v_public	VARCHAR(5)		,
v_rec	INT		

);

CREATE TABLE tbl_members(
m_id	VARCHAR(20)		PRIMARY KEY,
m_pw	VARCHAR(125)	NOT NULL	,
m_nick	VARCHAR(20)		,
m_image	VARCHAR(225),
m_role VARCHAR(5) NOT NULL
);

CREATE TABLE tbl_like(
like_seq INT AUTO_INCREMENT PRIMARY KEY,
like_user VARCHAR(20) NOT NULL,
like_vseq INT NOT NULL
);

CREATE TABLE tbl_comment (
c_seq INT AUTO_INCREMENT PRIMARY KEY,
c_user VARCHAR(20) NOT NULL,
c_vseq INT NOT NULL,
c_comment VARCHAR(255) NOT NULL
);





-- 단어장seq 외래키
ALTER TABLE tbl_words
ADD CONSTRAINT FK_WSEQ
FOREIGN KEY (w_vseq)
REFERENCES tbl_vocas(v_seq);

-- id 외래키
ALTER TABLE tbl_vocas
ADD CONSTRAINT FK_VMID
FOREIGN KEY (v_mid)
REFERENCES tbl_members(m_id);

-- tbl_like like user 외래키
ALTER TABLE tbl_like
ADD CONSTRAINT FK_LMID
FOREIGN KEY (like_user)
REFERENCES tbl_members(m_id);

-- tbl_like 단어장 외래키
ALTER TABLE tbl_like
ADD CONSTRAINT FK_LVSEQ
FOREIGN KEY (like_vseq)
REFERENCES tbl_vocas(v_seq);

-- tbl_comment c user 외래키
ALTER TABLE tbl_comment
ADD CONSTRAINT FK_CMID
FOREIGN KEY (c_user)
REFERENCES tbl_members(m_id);

-- tbl_comment c vseq 외래키
ALTER TABLE tbl_comment
ADD CONSTRAINT FK_CSEQ
FOREIGN KEY (c_vseq)
REFERENCES tbl_vocas(v_seq);



DESC tbl_words;
SELECT * FROM tbl_members;
SELECT * FROM tbl_vocas;
SELECT * FROM tbl_like;