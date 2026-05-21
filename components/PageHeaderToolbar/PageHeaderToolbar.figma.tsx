import figma from '@figma/code-connect'
import { PageHeaderToolbar } from './PageHeaderToolbar'
import { Breadcrumb } from '../Breadcrumb/Breadcrumb'
import { ToggleButton } from '../ToggleButton/ToggleButton'
import { Button } from '../Button/Button'
import { ButtonGroup } from '../ButtonGroup/ButtonGroup'
import { Chip } from '../Chip/Chip'
import { TextField } from '../TextField/TextField'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

/**
 * NOTE — Figma property names are mid-rename (2026-05-21) to match these code prop names.
 * Until the Figma rename ships, the boolean properties (`chips`, `buttonGroup`, etc.)
 * still mean "show this slot" in Figma but get mapped here to actual ReactNode content.
 * After Figma renames, this file may need minor adjustments to mapping syntax.
 */
figma.connect(PageHeaderToolbar, 'https://www.figma.com/design/PjAYuPDr8IA1ccwiAjFkSD?node-id=3859-2813', {
  props: {
    variant: figma.enum('variant', {
      default: 'default',
      full: 'full',
      NewCanvas: 'NewCanvas',
    }),
    pageTitleText: figma.string('Page Title Text'),
    eyebrowText: figma.string('Eyebrow Text'),
  },
  example: ({ variant, pageTitleText, eyebrowText }) => (
    <PageHeaderToolbar
      variant={variant}
      pageTitleText={pageTitleText}
      eyebrowText={eyebrowText}
      chips={
        <>
          <Chip size="small" color="default" variant="contained" label="Tag 1" />
          <Chip size="small" color="default" variant="contained" label="Tag 2" />
        </>
      }
      indicator={true}
      singleButton={<Button variant="contained" color="secondary" size="medium">Single</Button>}
      buttonGroup={
        <ButtonGroup variant="contained" color="secondary" size="medium" orientation="horizontal" />
      }
      inputTextField={<TextField size="small" placeholder="Search…" />}
      breadcrumb={
        <Breadcrumb
          state="breadcrumb"
          showNumberIndicator={true}
          recordCount="1,284"
          links={[
            { label: 'Parent', href: '#' },
            { label: 'Selected', selected: true },
          ]}
          actions={
            <ToggleButton
              size="small"
              buttons={[
                { icon: <FilterAltOffIcon />, 'aria-label': 'Clear filters' },
                { icon: <FileDownloadIcon />, 'aria-label': 'Export' },
                { icon: <RestartAltIcon />, 'aria-label': 'Reset' },
              ]}
            />
          }
        />
      }
    />
  ),
})
