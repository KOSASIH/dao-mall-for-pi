pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Reputation {
    using SafeMath for uint256;

    struct UserReputation {
        uint256 id;
        address user;
        uint256 reputationScore;
        uint256 totalVotes;
        mapping (address => uint256) votes;
    }

    mapping (address => UserReputation) public userReputations;
    uint256 public userCount;

    event ReputationUpdated(address user, uint256 newScore);

    function updateUserReputation(address _user, uint256 _newScore) public {
        UserReputation storage userRep = userReputations[_user];
        userRep.reputationScore = _newScore;
        userRep.totalVotes++;

        emit ReputationUpdated(_user, _newScore);
    }

    function getUserReputation(address _user) public view returns (uint256) {
        return userReputations[_user].reputationScore;
    }

    function voteForUser(address _user, uint256 _vote) public {
        UserReputation storage userRep = userReputations[_user];
        userRep.votes[msg.sender] = _vote;
        updateUserReputation(_user, userRep.reputationScore + _vote);
    }
}
