pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Rating {
    using SafeMath for uint256;

    struct RatingData {
        uint256 id;
        address user;
        uint256 rating;
        uint256 totalVotes;
        mapping (address => uint256) votes;
    }

    mapping (address => RatingData) public userRatings;
    uint256 public userCount;

    event RatingUpdated(address user, uint256 newRating);

    function updateRating(address _user, uint256 _newRating) public {
        RatingData storage userRating = userRatings[_user];
        userRating.rating = _newRating;
        userRating.totalVotes++;

        emit RatingUpdated(_user, _newRating);
    }

    function getRating(address _user) public view returns (uint256) {
        return userRatings[_user].rating;
    }

    function voteForUser(address _user, uint256 _vote) public {
        RatingData storage userRating = userRatings[_user];
        userRating.votes[msg.sender] = _vote;
        updateRating(_user, userRating.rating + _vote);
    }
}
