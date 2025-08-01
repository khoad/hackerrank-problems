// How to compile and run:
// g++ -o ClimbingTheLeaderboard ClimbingTheLeaderboard.cpp && cat ~/Downloads/input02.txt | ./ClimbingTheLeaderboard
#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <algorithm>
#include <functional>
#include <cctype>
#include <fstream>  // Add this line for ofstream


using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);
void printArray(vector<int> arr);

/*
 * Complete the 'climbingLeaderboard' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY ranked
 *  2. INTEGER_ARRAY player
 */

// vector<int> climbingLeaderboard(vector<int> ranked, vector<int> player) {
//     vector<int> realRanks;
//     for (int p : player) {        
//         int padded = 0;
//         // cout << "Before ";
//         // printArray(ranked);
//         for (int i = 0; i < ranked.size(); i++) {
//             if (p >= ranked[i]) {
//                 // Add p to ranked
//                 ranked.insert(ranked.begin() + i, p);
//                 // cout << "Now    ";
//                 // printArray(ranked);
//                 int rank = i + 1 - padded;
//                 // cout << i << " + 1 - " << padded << " = " << rank << endl;
//                 realRanks.push_back(rank);
//                 break;
//             } else if (i == ranked.size() - 1) {
//                 ranked.push_back(p);
//                 // cout << "Now    ";
//                 // printArray(ranked);
//                 int rank = ranked.size() - padded;
//                 // cout << ranked.size() << " - " << padded << " = " << rank << endl;
//                 realRanks.push_back(rank);
//                 break;
//             }
//             // No need to check for (i < ranked.size() - 1) because ranked just growed by 1
//             if (ranked[i] == ranked[i+1]) {
//                 padded++;
//             }
//         }
//     }
    
//     return realRanks;
// }

vector<int> climbingLeaderboard(vector<int> ranked, vector<int> player) {
    // Remove duplicates from ranked scores to get unique ranks
    vector<int> uniqueRanks;
    for (int i = 0; i < ranked.size(); i++) {
        if (i == 0 || ranked[i] != ranked[i-1]) {
            uniqueRanks.push_back(ranked[i]);
        }
    }
    
    vector<int> results;
    int rankIndex = uniqueRanks.size() - 1; // Start from the lowest rank
    
    // Since player scores are in ascending order, use two-pointer technique
    for (int playerScore : player) {
        // Move up the ranks while player score is >= current rank score
        while (rankIndex >= 0 && playerScore >= uniqueRanks[rankIndex]) {
            rankIndex--;
        }
        // Player's rank is the position after where we stopped + 1 (1-indexed)
        results.push_back(rankIndex + 2);
    }
    
    return results;
}

void printArray(vector<int> arr) {
    // Print the array
    cout << "array: ";
    for (int element : arr) {
        cout << element << " ";
    }
    cout << endl;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string ranked_count_temp;
    getline(cin, ranked_count_temp);

    int ranked_count = stoi(ltrim(rtrim(ranked_count_temp)));

    string ranked_temp_temp;
    getline(cin, ranked_temp_temp);

    vector<string> ranked_temp = split(rtrim(ranked_temp_temp));

    vector<int> ranked(ranked_count);

    for (int i = 0; i < ranked_count; i++) {
        int ranked_item = stoi(ranked_temp[i]);

        ranked[i] = ranked_item;
    }

    string player_count_temp;
    getline(cin, player_count_temp);

    int player_count = stoi(ltrim(rtrim(player_count_temp)));

    string player_temp_temp;
    getline(cin, player_temp_temp);

    vector<string> player_temp = split(rtrim(player_temp_temp));

    vector<int> player(player_count);

    for (int i = 0; i < player_count; i++) {
        int player_item = stoi(player_temp[i]);

        player[i] = player_item;
    }

    vector<int> result = climbingLeaderboard(ranked, player);

    for (size_t i = 0; i < result.size(); i++) {
        fout << result[i];

        if (i != result.size() - 1) {
            fout << "\n";
        }
    }

    fout << "\n";

    fout.close();

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