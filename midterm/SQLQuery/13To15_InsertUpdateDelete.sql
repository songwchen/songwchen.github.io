insert into Shippers (CompanyName, Phone)
values ('青杉人才','(02)66057606')

insert into Shippers (CompanyName, Phone)
values ('青群科技','(02)14055374')

update Shippers
set
	CompanyName = '青杉人才有限公司'
where
	CompanyName = '青杉人才'

update Shippers
set
	CompanyName = '青群科技有限公司',
	Phone = '(02)66057606'
where
	CompanyName = '青群科技'

delete from Shippers
where
	CompanyName = '青杉人才有限公司' or
	CompanyName = '青群科技有限公司'