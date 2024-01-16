"""empty message

Revision ID: 3d754cdfbae8
Revises: 
Create Date: 2023-12-19 12:02:53.469825

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3d754cdfbae8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('input_words',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('input_language', sa.String(), nullable=True),
    sa.Column('input_word', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_input_words'))
    )
    op.create_table('output_words',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('output_language', sa.String(), nullable=True),
    sa.Column('output_word', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_output_words'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users'))
    )
    op.create_table('translations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('input_word_id', sa.Integer(), nullable=False),
    sa.Column('output_word_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['input_word_id'], ['input_words.id'], name=op.f('fk_translations_input_word_id_input_words')),
    sa.ForeignKeyConstraint(['output_word_id'], ['output_words.id'], name=op.f('fk_translations_output_word_id_output_words')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_translations_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_translations'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('translations')
    op.drop_table('users')
    op.drop_table('output_words')
    op.drop_table('input_words')
    # ### end Alembic commands ###
