// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TodoList {

    struct Task {
        string description;
        bool completed;
        uint256 createdAt;
    }

    mapping(address => Task[]) private userTasks;

    event TaskAdded(address indexed user, uint256 taskId, string description);
    event TaskUpdated(address indexed user, uint256 taskId, bool completed);

    // Add a new task
    function addTask(string memory _description) public {
        require(bytes(_description).length > 0, "Task cannot be empty");

        userTasks[msg.sender].push(
            Task(_description, false, block.timestamp)
        );

        emit TaskAdded(
            msg.sender,
            userTasks[msg.sender].length - 1,
            _description
        );
    }

    // Update task completion status
    function updateTask(uint256 _taskId, bool _completed) public {
        require(_taskId < userTasks[msg.sender].length, "Invalid task ID");

        userTasks[msg.sender][_taskId].completed = _completed;

        emit TaskUpdated(msg.sender, _taskId, _completed);
    }

    // Get number of tasks
    function getTaskCount() public view returns (uint256) {
        return userTasks[msg.sender].length;
    }

    // Retrieve a task
    function getTask(uint256 _taskId) public view returns (
        string memory,
        bool,
        uint256
    ) {
        require(_taskId < userTasks[msg.sender].length, "Invalid task ID");

        Task memory task = userTasks[msg.sender][_taskId];

        return (
            task.description,
            task.completed,
            task.createdAt
        );
    }
}