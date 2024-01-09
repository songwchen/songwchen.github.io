select
	o.OrderID,
	s.CompanyName,
	e.FirstName + ' ' + e.LastName as Employee
from Orders as o
join Shippers as s on o.ShipVia = s.ShipperID
join Employees as e on e.EmployeeID = o.EmployeeID