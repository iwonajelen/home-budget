export function stringToDate(_date,_format,_delimiter)
{
    const formatLowerCase=_format.toLowerCase();
    const formatItems=formatLowerCase.split(_delimiter);
    const dateItems=_date.split(_delimiter);
    const monthIndex=formatItems.indexOf("mm");
    const dayIndex=formatItems.indexOf("dd");
    const yearIndex=formatItems.indexOf("yyyy");
    const month=parseInt(dateItems[monthIndex])-1;
    return new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
}