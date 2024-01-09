select
	p.ProductName,
	c.CategoryName
from Products as p
join Categories as c on c.CategoryID = p.CategoryID