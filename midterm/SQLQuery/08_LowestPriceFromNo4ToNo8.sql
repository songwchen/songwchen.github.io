select 
	ProductName,
	UnitPrice
from Products
order by UnitPrice
offset 3 rows fetch next 5 rows only