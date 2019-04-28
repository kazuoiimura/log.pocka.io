/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FC } from 'react'

import { BaseProps } from '~/components/BaseProps'
import { $iconFont } from '~/components/icons/common'

export const Nuxt: FC<BaseProps> = props => (
  <svg css={$iconFont} viewBox="0 -3 24 24" {...props}>
    <g clipPath="url(#nuxt_clip0)">
      <path d="M19.616 10.28l-4.273-7.298-1.69 2.922 1.681 2.889 5.14 8.784-10.237.026-3.356.008-.008.017 8.504-.017 8.504-.025-4.265-7.306z" />
      <path d="M13.652 5.904L10.195 0 5.097 8.818 0 17.628l6.881-.017 4.223-7.306 2.548-4.4z" />
      <path d="M20.474 17.577l-5.14-8.784-1.682-2.889-2.548 4.401-4.223 7.306 3.356-.008 10.237-.026z" />
    </g>
    <defs>
      <clipPath id="nuxt_clip0">
        <path fill="#fff" d="M0 0h24v17.628H0z" />
      </clipPath>
    </defs>
  </svg>
)

export default Nuxt
