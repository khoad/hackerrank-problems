// How to compile and run:
// g++ -o PickingNumbers PickingNumbers.cpp && cat ~/Downloads/input07.txt | ./PickingNumbers
#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <algorithm>
#include <functional>
#include <cctype>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'pickingNumbers' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

int pickingNumbers(vector<int> a) {
    map<int, int> map;
    for (int i : a) {
        if (map.find(i) == map.end()) {
            map[i] = 1;
        } else {
            map[i]++;
        }
    }
    
    int maxCount = 0;
    
    for (auto pair : map) {
        int curKey = pair.first;
        int curCount = pair.second;
        
        // Take the max for the current count
        maxCount = max(maxCount, curCount);
        
        if (map.find(curKey - 1) != map.end()) {
            // -1 exists
            int nextValue = map[curKey - 1];
            maxCount = max(maxCount, curCount + nextValue);
        }
        
        if (map.find(curKey + 1) != map.end()) {
            // +1 exists
            int nextValue = map[curKey + 1];
            maxCount = max(maxCount, curCount + nextValue);
        }
    }
    
    return maxCount;
}

int main()
{
    // ofstream fout(getenv("OUTPUT_PATH"));

    string n_temp;
    getline(cin, n_temp);

    int n = stoi(ltrim(rtrim(n_temp)));

    string a_temp_temp;
    getline(cin, a_temp_temp);

    vector<string> a_temp = split(rtrim(a_temp_temp));

    vector<int> a(n);

    for (int i = 0; i < n; i++) {
        int a_item = stoi(a_temp[i]);

        a[i] = a_item;
    }

    int result = pickingNumbers(a);

    // fout << result << "\n";
    cout << result << "\n";

    // fout.close();

    return 0;
}

string ltrim(const string &str) {
    string s(str);

    s.erase(
        s.begin(),
        find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
    );

    return s;
}

string rtrim(const string &str) {
    string s(str);

    s.erase(
        find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
        s.end()
    );

    return s;
}

vector<string> split(const string &str) {
    vector<string> tokens;

    string::size_type start = 0;
    string::size_type end = 0;

    while ((end = str.find(" ", start)) != string::npos) {
        tokens.push_back(str.substr(start, end - start));

        start = end + 1;
    }

    tokens.push_back(str.substr(start));

    return tokens;
}
