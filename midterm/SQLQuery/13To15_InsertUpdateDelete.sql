insert into Shippers (CompanyName, Phone)
values ('�C���H�~','(02)66057606')

insert into Shippers (CompanyName, Phone)
values ('�C�s���','(02)14055374')

update Shippers
set
	CompanyName = '�C���H�~�������q'
where
	CompanyName = '�C���H�~'

update Shippers
set
	CompanyName = '�C�s��ަ������q',
	Phone = '(02)66057606'
where
	CompanyName = '�C�s���'

delete from Shippers
where
	CompanyName = '�C���H�~�������q' or
	CompanyName = '�C�s��ަ������q'