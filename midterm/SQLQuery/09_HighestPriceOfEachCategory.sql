with ProductRowNum as (
	select
		c.CategoryName,
		p.ProductName,
		p.UnitPrice,
		ROW_NUMBER() over (partition by c.CategoryName order by p.UnitPrice desc) as Row
	from Categories as c
	join Products as p on p.CategoryID = c.CategoryID
)

select
	CategoryName,
	ProductName,
	UnitPrice
from ProductRowNum
where Row = 1