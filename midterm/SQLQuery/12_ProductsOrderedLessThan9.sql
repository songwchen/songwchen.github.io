select
	od.ProductID,
	p.ProductName,
	count(od.ProductID) as ProductCounts
from [Order Details] as od
join Products as p on p.ProductID = od.ProductID
group by od.ProductID, p.ProductName
having count(od.ProductID) < 9
order by od.ProductID