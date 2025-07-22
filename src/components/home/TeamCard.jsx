import React from 'react';
import { Users, User } from 'lucide-react';

export const TeamCard = ({
  team,
  currentUserId,
  onClick,
}) => {
  const isOwner = team.ownerId === currentUserId;

  // Example date formatting (uncomment if needed)
  // const lastModified = team.lastModified?.toLocaleDateString('en-US', {
  //   year: 'numeric',
  //   month: 'short',
  //   day: 'numeric',
  //   hour: '2-digit',
  //   minute: '2-digit',
  // });

  const lastModified = ''; // Placeholder if not using date

  return (
    <div
      className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-800/30 transition-colors">
          <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {team.name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
            <User className="h-3 w-3" />
            <span>{isOwner ? 'You' : team.ownerId}</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {team.members.length} member{team.members.length !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Modified {lastModified}
          </p>
        </div>
      </div>
    </div>
  );
};
