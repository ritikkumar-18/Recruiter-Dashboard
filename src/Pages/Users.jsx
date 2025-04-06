import React from 'react'
import Header from '../components/Common/Header'
import { motion } from 'framer-motion'

import Usertable from '../components/Users/Usertable';


const userStats = {
	totalUsers: 152845,
	newUsersToday: 243,
	activeUsers: 98520,
	churnRate: "2.4%",
};


const Users = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10 scroll-hidden'>
			<Header title='Recruiters' />

			<main className='max-w-7xl  '>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					{/* <StatCards
						name='Total Users'
						icon={UsersIcon}
						value={userStats.totalUsers.toLocaleString()}
						color='#6366F1'
					/>
					<StatCards name='New Users Today' icon={UserPlus2} value={userStats.newUsersToday} color='#10B981' />
					<StatCards
						name='Active Users'
						icon={UserCheck}
						value={userStats.activeUsers.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCards name='Churn Rate' icon={UserX} value={userStats.churnRate} color='#EF4444' /> */}
				</motion.div>
        <Usertable/>
       
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 '>
          

        </div>
        </main>
        </div>
  )
}

export default Users