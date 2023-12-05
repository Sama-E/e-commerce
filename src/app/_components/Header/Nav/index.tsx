'use client'

import classes from './index.module.scss'
import React from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'
import { Button } from '../../Button'


export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav
      className={[
        classes.nav,
        user === undefined && classes.hide,
      ]
        .filter(Boolean)
        .join(' ')}
    >

      {/* LINKS */}
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="none" />
      })}

      {/* ACCOUNT */}
      {user && <Link href="/account">Account</Link>}

      {/* LOGIN */}
      {!user && 
      (
        <Button
          el="link"
          href="/login"
          label="Login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
      { user && <CartLink />}
    </nav>
  )
}
