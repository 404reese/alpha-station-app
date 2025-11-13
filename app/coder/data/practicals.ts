export interface Practical {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  practicalNumber: number;
}

export interface Subject {
  id: string;
  name: string;
  practicals: Practical[];
}

export interface Department {
  id: string;
  name: string;
  subjects: Subject[];
}

export const departments: Department[] = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    subjects: [
      {
        id: 'java-dsa',
        name: 'Java DSA',
        practicals: [
          {
            id: 'java-dsa-1',
            title: 'Array Operations & Linear Search',
            description: 'Implement basic array operations including insertion, deletion, and linear search algorithm.',
            difficulty: 'Beginner',
            estimatedTime: '45 mins',
            practicalNumber: 1
          },
          {
            id: 'java-dsa-2',
            title: 'Binary Search Implementation',
            description: 'Learn and implement binary search algorithm on sorted arrays with time complexity analysis.',
            difficulty: 'Beginner',
            estimatedTime: '30 mins',
            practicalNumber: 2
          },
          {
            id: 'java-dsa-3',
            title: 'Stack Using Arrays',
            description: 'Implement stack data structure using arrays with push, pop, and peek operations.',
            difficulty: 'Intermediate',
            estimatedTime: '60 mins',
            practicalNumber: 3
          },
          {
            id: 'java-dsa-4',
            title: 'Queue Implementation',
            description: 'Implement queue data structure with enqueue, dequeue operations and circular queue variant.',
            difficulty: 'Intermediate',
            estimatedTime: '60 mins',
            practicalNumber: 4
          },
          {
            id: 'java-dsa-5',
            title: 'Linked List Operations',
            description: 'Create singly linked list with insertion, deletion, and traversal operations.',
            difficulty: 'Intermediate',
            estimatedTime: '75 mins',
            practicalNumber: 5
          },
          {
            id: 'java-dsa-6',
            title: 'Binary Tree Traversal',
            description: 'Implement binary tree with inorder, preorder, and postorder traversal methods.',
            difficulty: 'Advanced',
            estimatedTime: '90 mins',
            practicalNumber: 6
          }
        ]
      },
      {
        id: 'python-dsa',
        name: 'Python DSA',
        practicals: [
          {
            id: 'python-dsa-1',
            title: 'List Comprehensions & Sorting',
            description: 'Master Python list comprehensions and implement various sorting algorithms.',
            difficulty: 'Beginner',
            estimatedTime: '40 mins',
            practicalNumber: 1
          },
          {
            id: 'python-dsa-2',
            title: 'Dictionary & Hash Operations',
            description: 'Work with Python dictionaries and implement hash-based data structures.',
            difficulty: 'Beginner',
            estimatedTime: '35 mins',
            practicalNumber: 2
          },
          {
            id: 'python-dsa-3',
            title: 'Stack & Queue with Collections',
            description: 'Implement stack and queue using Python collections module (deque).',
            difficulty: 'Intermediate',
            estimatedTime: '50 mins',
            practicalNumber: 3
          },
          {
            id: 'python-dsa-4',
            title: 'Graph Algorithms - BFS/DFS',
            description: 'Implement graph representation and breadth-first, depth-first search algorithms.',
            difficulty: 'Advanced',
            estimatedTime: '100 mins',
            practicalNumber: 4
          },
          {
            id: 'python-dsa-5',
            title: 'Dynamic Programming Basics',
            description: 'Learn dynamic programming with fibonacci, knapsack, and coin change problems.',
            difficulty: 'Advanced',
            estimatedTime: '120 mins',
            practicalNumber: 5
          }
        ]
      },
      {
        id: 'web-dev',
        name: 'Web Development',
        practicals: [
          {
            id: 'web-dev-1',
            title: 'HTML5 Semantic Structure',
            description: 'Create semantic HTML5 document structure with proper tags and accessibility.',
            difficulty: 'Beginner',
            estimatedTime: '30 mins',
            practicalNumber: 1
          },
          {
            id: 'web-dev-2',
            title: 'CSS Flexbox Layout',
            description: 'Design responsive layouts using CSS Flexbox properties and media queries.',
            difficulty: 'Beginner',
            estimatedTime: '45 mins',
            practicalNumber: 2
          },
          {
            id: 'web-dev-3',
            title: 'JavaScript DOM Manipulation',
            description: 'Interactive web page development using JavaScript DOM methods and event handling.',
            difficulty: 'Intermediate',
            estimatedTime: '60 mins',
            practicalNumber: 3
          },
          {
            id: 'web-dev-4',
            title: 'AJAX & API Integration',
            description: 'Fetch data from REST APIs using AJAX and display dynamic content.',
            difficulty: 'Intermediate',
            estimatedTime: '75 mins',
            practicalNumber: 4
          }
        ]
      }
    ]
  },
  {
    id: 'it',
    name: 'Information Technology',
    subjects: [
      {
        id: 'database',
        name: 'Database Management',
        practicals: [
          {
            id: 'db-1',
            title: 'SQL Basic Queries',
            description: 'Learn SELECT, INSERT, UPDATE, DELETE operations with WHERE clauses.',
            difficulty: 'Beginner',
            estimatedTime: '40 mins',
            practicalNumber: 1
          },
          {
            id: 'db-2',
            title: 'Table Joins & Relationships',
            description: 'Master INNER, LEFT, RIGHT joins and understand foreign key relationships.',
            difficulty: 'Intermediate',
            estimatedTime: '60 mins',
            practicalNumber: 2
          },
          {
            id: 'db-3',
            title: 'Stored Procedures & Functions',
            description: 'Create stored procedures, functions, and triggers for database automation.',
            difficulty: 'Advanced',
            estimatedTime: '90 mins',
            practicalNumber: 3
          }
        ]
      },
      {
        id: 'networking',
        name: 'Computer Networks',
        practicals: [
          {
            id: 'net-1',
            title: 'Network Configuration',
            description: 'Configure IP addresses, subnets, and basic network troubleshooting.',
            difficulty: 'Beginner',
            estimatedTime: '50 mins',
            practicalNumber: 1
          },
          {
            id: 'net-2',
            title: 'Socket Programming',
            description: 'Implement client-server communication using socket programming.',
            difficulty: 'Advanced',
            estimatedTime: '100 mins',
            practicalNumber: 2
          }
        ]
      }
    ]
  }
];

export const getSubjectsByDepartment = (departmentId: string): Subject[] => {
  const department = departments.find(dept => dept.id === departmentId);
  return department ? department.subjects : [];
};

export const getPracticalsBySubject = (departmentId: string, subjectId: string): Practical[] => {
  const department = departments.find(dept => dept.id === departmentId);
  if (!department) return [];
  
  const subject = department.subjects.find(subj => subj.id === subjectId);
  return subject ? subject.practicals : [];
};