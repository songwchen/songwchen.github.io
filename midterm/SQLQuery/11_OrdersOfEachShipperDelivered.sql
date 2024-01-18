SELECT
	S.ShipperID,
	S.CompanyName,
	COUNT(O.OrderID) AS OrderCount	
FROM Shippers AS S
JOIN Orders AS O ON S.ShipperID = O.ShipVia
GROUP BY S.ShipperID, S.CompanyName