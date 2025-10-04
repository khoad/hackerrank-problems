import requests
from datetime import datetime
from typing import List

def solution(firstDate: str, lastDate: str) -> List[str]:
    """
    Retrieve stock information for $TTD within the given date range.
    
    Args:
        firstDate (str): Beginning of the period to report (format: "d-mmm-yyyy")
        lastDate (str): End of the period to report (format: "d-mmm-yyyy")
    
    Returns:
        List[str]: Array of strings with date, open price, and close price
    """
    base_url = "https://api-regional.codesignalcontent.com/stocks"
    all_stock_data = []
    page = 1
    
    # Fetch all pages of data
    while True:
        try:
            # Query the API with pagination
            response = requests.get(f"{base_url}?page={page}", timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            # Add current page data to our collection
            all_stock_data.extend(data.get('data', []))
            
            # Check if we've reached the last page
            if page >= data.get('total_pages', 1):
                break
                
            page += 1
            
        except requests.exceptions.RequestException as e:
            print(f"Error fetching page {page}: {e}")
            break
    
    # Parse date strings for comparison
    def parse_date(date_str):
        """Parse date string in format 'd-mmm-yyyy' to datetime object"""
        return datetime.strptime(date_str, "%d-%B-%Y")
    
    try:
        start_date = parse_date(firstDate)
        end_date = parse_date(lastDate)
    except ValueError as e:
        print(f"Error parsing dates: {e}")
        return []
    
    # Filter data by date range and format output
    result = []
    for stock in all_stock_data:
        try:
            stock_date = parse_date(stock['date'])
            
            # Check if date is within range (inclusive)
            if start_date <= stock_date <= end_date:
                # Format: date open_price close_price (rounded to 2 decimal places)
                formatted_line = f"{stock['date']} {stock['open']:.2f} {stock['close']:.2f}"
                result.append(formatted_line)
                
        except (KeyError, ValueError) as e:
            # Skip invalid entries
            continue
    
    return result

# Example usage and testing
if __name__ == "__main__":
    # Test with the provided example
    first_date = "1-January-2000"
    last_date = "11-January-2000"
    
    print("Fetching stock data...")
    result = solution(first_date, last_date)
    
    print(f"\nStock data from {first_date} to {last_date}:")
    for line in result:
        print(line)
