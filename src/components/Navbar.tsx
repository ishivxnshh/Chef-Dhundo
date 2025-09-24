"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth, SignInButton, UserButton, useUser } from '@clerk/nextjs'
import { useUserStore, useUsers, useUserLoading, useUserError, useCurrentUserRole, useIsRoleLoaded } from '@/store/userStore'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  
  // User store hooks
  const users = useUsers();
  const isLoadingUsers = useUserLoading();
  const userError = useUserError();
  const currentUserRole = useCurrentUserRole();
  const isRoleLoaded = useIsRoleLoaded();
  const { fetchUsers, setCurrentUserRole, setRoleLoaded, clearCurrentUser } = useUserStore();

  // Fetch users when component mounts
  useEffect(() => {
    // console.log('🔍 Navbar: Fetching users...');
    fetchUsers();
  }, [fetchUsers]);

  // Log user data when it changes and find current user's role
  useEffect(() => {
    if (users.length > 0) {
      // console.log('✅ Navbar: Users loaded:', users);
      // console.log('📊 Navbar: Total users:', users.length);
      // console.log('📋 Navbar: First user properties:', users[0]?.properties);
      
      // Find current user's role by comparing email
      if (user?.emailAddresses && user.emailAddresses.length > 0) {
        const currentUserEmail = user.emailAddresses[0].emailAddress;
        // console.log('🔍 Navbar: Current user email:', currentUserEmail);
        
                 const matchingUser = users.find((storeUser) => {
           // Extract email from userStore data - based on the API response structure
           const storeUserEmail = (storeUser.properties?.email as Record<string, unknown>)?.email as string;
           // console.log('🔍 Navbar: Comparing with store user email:', storeUserEmail);
           return storeUserEmail === currentUserEmail;
         });
        
                 if (matchingUser) {
           // console.log('✅ Navbar: Found matching user:', matchingUser);
           // console.log('📋 Navbar: User properties:', matchingUser.properties);
           // console.log('🎭 Navbar: Role property:', matchingUser.properties?.role);
           
           const role = ((matchingUser.properties?.role as Record<string, unknown>)?.select as Record<string, unknown>)?.name as string;
           // console.log('✅ Navbar: Extracted role:', role);
           setCurrentUserRole(role || 'basic');
           setRoleLoaded(true);
         } else {
           // console.log('❌ Navbar: No matching user found in store');
           setCurrentUserRole('basic');
           setRoleLoaded(true);
         }
      }
    }
  }, [users, user, setCurrentUserRole, setRoleLoaded]);

  // Log loading and error states
  useEffect(() => {
    if (isLoadingUsers) {
      // console.log('⏳ Navbar: Loading users...');
    }
    if (userError) {
      // console.error('❌ Navbar: User error:', userError);
    }
  }, [isLoadingUsers, userError]);

  // Reset role loading state when user signs out
  useEffect(() => {
    if (!isSignedIn) {
      setRoleLoaded(false);
      clearCurrentUser();
      setCurrentUserRole('basic');
    }
  }, [isSignedIn, setRoleLoaded, clearCurrentUser, setCurrentUserRole]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const navLinks = [
    { href: "/", text: "Home", primary: false },
    { href: "/findchefs", text: "Find Chef", primary: false },
    { href: "/dashboard", text: "Dashboard", primary: false },
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
                             <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
                 <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center">
                   <Image
                     src="/website/home/logo.png"
                     alt="Chef Dhundho Logo"
                     width={48}
                     height={48}
                     className="w-full h-full object-cover"
                   />
                 </div>
                 <span className="ml-3 text-xl font-semibold text-gray-900">Chef Dhundho</span>
               </Link>
            </div>
            
                         {/* Desktop Menu */}
             <div className="hidden md:flex items-center space-x-8">
               {navLinks.map((link) => (
                 <Link
                   key={link.href}
                   href={link.href}
                   className="text-gray-900 hover:text-gray-700 font-medium"
                 >
                   {link.text}
                 </Link>
               ))}
               
                               {/* Dynamic Role Tag - Only show when role is loaded and user is signed in */}
                {isSignedIn && isRoleLoaded && (
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                    currentUserRole === 'pro' 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {currentUserRole === 'pro' ? 'Pro ⚡' : 'Basic ⚪'}
                  </span>
                )}
              
              {/* Auth Button */}
              <div className="ml-4">
                {isSignedIn ? (
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                ) : (
                  <SignInButton mode="modal">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
                      Login
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Auth Button for Mobile */}
              <div>
                {isSignedIn ? (
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                ) : (
                  <SignInButton mode="modal">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm">
                      Login
                    </button>
                  </SignInButton>
                )}
              </div>
              
              <button
                onClick={toggleMobileMenu}
                className="text-gray-900 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

                     {/* Mobile Menu Overlay */}
           {isMobileMenuOpen && (
             <div className="md:hidden">
               <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                 {navLinks.map((link) => (
                   <Link
                     key={link.href}
                     href={link.href}
                     className="block px-3 py-2 text-gray-900 hover:text-gray-700 font-medium"
                     onClick={closeMobileMenu}
                   >
                     {link.text}
                   </Link>
                 ))}
               </div>
             </div>
           )}
        </nav>
      </header>
  )
}

export default Navbar